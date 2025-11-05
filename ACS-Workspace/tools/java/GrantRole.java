import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.Properties;

public class GrantRole {
  public static void main(String[] args) {
    if (args.length < 2) {
      System.err.println("Usage: java tools.java.GrantRole <email> <ROLE_NAME>");
      System.exit(1);
    }
    final String email = args[0].toLowerCase();
    final String roleName = args[1];

    String dbUrl = System.getenv("DATABASE_URL");
    if (dbUrl == null || dbUrl.isEmpty()) {
      System.err.println("DATABASE_URL env var is required (e.g., postgresql://user:pass@localhost:5432/db?schema=public)");
      System.exit(2);
    }

    try {
      DbInfo db = parseDatabaseUrl(dbUrl);
      String jdbcUrl = "jdbc:postgresql://" + db.host + ":" + db.port + "/" + db.database;
      Properties props = new Properties();
      props.setProperty("user", db.user);
      props.setProperty("password", db.password);
      if (db.schema != null && !db.schema.isBlank()) {
        props.setProperty("options", "-c search_path=" + db.schema);
      }

      try (Connection conn = DriverManager.getConnection(jdbcUrl, props)) {
        conn.setAutoCommit(false);

        String userId = selectOne(conn, "SELECT \"id\" FROM \"User\" WHERE \"email\" = ?", email);
        if (userId == null) throw new RuntimeException("User not found for email: " + email + ". Make sure they have signed in once.");

        String roleId = selectOne(conn, "SELECT \"id\" FROM \"Role\" WHERE \"name\" = ?", roleName);
        if (roleId == null) throw new RuntimeException("Role not found: " + roleName);

        int inserted;
        try (PreparedStatement ps = conn.prepareStatement(
            "INSERT INTO \"UserRole\" (\"userId\",\"roleId\") VALUES (?, ?) " +
            "ON CONFLICT (\"userId\",\"roleId\") DO NOTHING")) {
          ps.setString(1, userId);
          ps.setString(2, roleId);
          inserted = ps.executeUpdate();
        }

        conn.commit();
        if (inserted > 0) {
          System.out.println("✅ Granted " + roleName + " to " + email);
        } else {
          System.out.println("ℹ️  Mapping already exists: " + email + " ↔ " + roleName);
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(3);
    }
  }

  private static String selectOne(Connection conn, String sql, String param) throws SQLException {
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
      ps.setString(1, param);
      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) return rs.getString(1);
      }
    }
    return null;
  }

  private static class DbInfo {
    String user, password, host, database, schema;
    int port;
  }

  private static DbInfo parseDatabaseUrl(String url) throws URISyntaxException {
    String norm = url.replaceFirst("^postgres(ql)?://", "postgresql://");
    URI u = URI.create(norm);

    DbInfo d = new DbInfo();
    String userInfo = u.getUserInfo();
    if (userInfo == null || !userInfo.contains(":")) {
      throw new URISyntaxException(url, "Missing user:password in DATABASE_URL");
    }
    String[] up = userInfo.split(":", 2);
    d.user = urlDecode(up[0]);
    d.password = urlDecode(up[1]);

    d.host = (u.getHost() == null) ? "localhost" : u.getHost();
    d.port = (u.getPort() == -1) ? 5432 : u.getPort();

    String path = u.getPath();
    if (path == null || path.length() < 2) {
      throw new URISyntaxException(url, "Missing database name in path");
    }
    d.database = path.substring(1);

    d.schema = null;
    String q = u.getQuery();
    if (q != null) {
      for (String kv : q.split("&")) {
        int eq = kv.indexOf('=');
        if (eq > 0) {
          String k = kv.substring(0, eq);
          String v = kv.substring(eq + 1);
          if ("schema".equalsIgnoreCase(k)) d.schema = v;
        }
      }
    }
    return d;
  }

  private static String urlDecode(String s) {
    return URLDecoder.decode(s, StandardCharsets.UTF_8);
  }
}
