# REST API Documentation

## Overview

The application provides secure REST API endpoints for form submissions with:
- Input validation and sanitization
- Rate limiting (10 requests per minute per IP)
- CORS protection
- Security headers

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Endpoints

### Health Check

Check if the API is healthy.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-06T05:30:46.981Z",
  "version": "1.0.0"
}
```

**Status Codes:**
- `200 OK`: Service is healthy

---

### Mentor Sign-Up

Submit a mentor application.

**Endpoint:** `POST /api/submit/mentor`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "major": "Computer Science",
  "year": "Senior",
  "interests": "Web development, AI, Machine Learning",
  "availability": "Weekdays 3-5 PM"
}
```

**Required Fields:**
- `name` (max 100 chars)
- `email` (valid email, max 254 chars)
- `major` (max 100 chars)
- `year` (max 50 chars)

**Optional Fields:**
- `interests` (max 500 chars)
- `availability` (max 500 chars)

**Success Response:**
```json
{
  "success": true,
  "message": "Mentor sign-up submitted successfully"
}
```

**Error Responses:**

Validation Error (400):
```json
{
  "error": "Validation failed",
  "details": ["name is required", "email is required"]
}
```

Invalid Email (400):
```json
{
  "error": "Invalid email format"
}
```

Rate Limit Exceeded (429):
```json
{
  "error": "Too many requests. Please try again later."
}
```

**Headers:**
- `X-RateLimit-Remaining`: Number of remaining requests

---

### Mentee Sign-Up

Submit a mentee application.

**Endpoint:** `POST /api/submit/mentee`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "major": "Information Technology",
  "year": "Sophomore",
  "goals": "Learn web development and get career guidance",
  "preferences": "Prefer mentor with industry experience"
}
```

**Required Fields:**
- `name` (max 100 chars)
- `email` (valid email, max 254 chars)
- `major` (max 100 chars)
- `year` (max 50 chars)

**Optional Fields:**
- `goals` (max 500 chars)
- `preferences` (max 500 chars)

**Responses:** Same as Mentor Sign-Up endpoint

---

### Tinikling Sign-Up

Submit a Tinikling dance workshop registration.

**Endpoint:** `POST /api/submit/tinikling`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "experience": "beginner",
  "notes": "Very excited to learn!"
}
```

**Required Fields:**
- `name` (max 100 chars)
- `email` (valid email, max 254 chars)

**Optional Fields:**
- `experience`: "beginner", "intermediate", or "advanced" (max 50 chars)
- `notes` (max 500 chars)

**Responses:** Same as Mentor Sign-Up endpoint

---

## Rate Limiting

All API endpoints are rate-limited to prevent abuse:

- **Limit:** 10 requests per minute per IP address
- **Window:** 60 seconds
- **Response:** 429 Too Many Requests when exceeded

**Rate Limit Headers:**
```
X-RateLimit-Remaining: 7
Retry-After: 60
```

## Security

### Input Validation

All inputs are:
1. Validated for required fields
2. Sanitized to prevent XSS attacks
3. Limited to maximum lengths
4. Type-checked

### Email Validation

Emails must:
- Match RFC 5322 format
- Be 254 characters or less
- Contain @ symbol and valid domain

### XSS Protection

All string inputs are sanitized:
- HTML tags are stripped (`<` and `>` removed)
- Strings are trimmed and limited to max length
- SQL injection patterns are filtered

## Error Handling

All errors return JSON with:

```json
{
  "error": "Error message here",
  "details": ["Optional array of specific errors"]
}
```

**HTTP Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid input
- `405 Method Not Allowed`: Wrong HTTP method
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Example Usage

### JavaScript (Fetch API)

```javascript
async function submitMentorApplication(data) {
  try {
    const response = await fetch('/api/submit/mentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage
submitMentorApplication({
  name: 'John Doe',
  email: 'john@example.com',
  major: 'Computer Science',
  year: 'Senior'
});
```

### cURL

```bash
# Submit mentor application
curl -X POST http://localhost:3000/api/submit/mentor \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "major": "Computer Science",
    "year": "Senior"
  }'

# Check health
curl http://localhost:3000/api/health
```

## CORS

API endpoints accept requests from:
- Same origin
- `https://campusgroups.rit.edu`
- `https://*.campusgroups.com`
- `https://*.rit.edu`

## Future Enhancements

Planned features:
- [ ] Database integration
- [ ] Email notifications
- [ ] Admin dashboard API
- [ ] JWT authentication for protected routes
- [ ] Webhook support
- [ ] File upload endpoints
