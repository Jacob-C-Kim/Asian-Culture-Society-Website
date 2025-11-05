import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

/**
 * Reads newline-delimited relative file paths from STDIN (from `git ls-files`),
 * builds a directory tree, and prints an ASCII skeleton up to the given depth.
 *
 * Usage:
 *   git ls-files -z --cached --others --exclude-standard | tr '\0' '\n' | java SkeletonPrinter 6
 */
public class SkeletonPrinter {
  static class Node {
    String name;
    boolean isDir;
    // Use LinkedHashMap to preserve sorted order we add
    Map<String, Node> children = new LinkedHashMap<>();
    Node(String name, boolean isDir) { this.name = name; this.isDir = isDir; }
  }

  public static void main(String[] args) throws Exception {
    int maxDepth = 6;
    if (args.length > 0) {
      try { maxDepth = Integer.parseInt(args[0]); } catch (NumberFormatException ignore) {}
    }

    Node root = new Node("", true);

    // Read all file paths (relative) and insert into tree
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String line;
    List<String> paths = new ArrayList<>();
    while ((line = br.readLine()) != null) {
      line = line.trim();
      if (!line.isEmpty()) paths.add(line);
    }

    // Sort for stable output
    Collections.sort(paths);

    for (String p : paths) {
      String[] parts = p.split("/+");
      Node curr = root;
      for (int i = 0; i < parts.length; i++) {
        String part = parts[i];
        boolean last = (i == parts.length - 1);
        Node child = curr.children.get(part);
        if (child == null) {
          child = new Node(part, !last || p.endsWith("/"));
          curr.children.put(part, child);
        }
        curr = child;
      }
    }

    // Print children of root
    printChildren(root, "", maxDepth, 0);
  }

  static void printChildren(Node dir, String prefix, int maxDepth, int level) {
    if (level >= maxDepth) return;

    // Separate dirs first, then files, both alpha
    List<Node> dirs = new ArrayList<>();
    List<Node> files = new ArrayList<>();
    for (Node n : dir.children.values()) {
      if (n.children.isEmpty()) files.add(n); else dirs.add(n);
    }
    dirs.sort(Comparator.comparing(a -> a.name));
    files.sort(Comparator.comparing(a -> a.name));

    List<Node> ordered = new ArrayList<>();
    ordered.addAll(dirs);
    ordered.addAll(files);

    for (int i = 0; i < ordered.size(); i++) {
      Node n = ordered.get(i);
      boolean last = (i == ordered.size() - 1);
      String branch = last ? "└─ " : "├─ ";
      System.out.println(prefix + branch + n.name);
      if (!n.children.isEmpty()) {
        String nextPrefix = prefix + (last ? "   " : "│  ");
        printChildren(n, nextPrefix, maxDepth, level + 1);
      }
    }
  }
}
