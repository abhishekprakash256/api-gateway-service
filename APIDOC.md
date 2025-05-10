
# 🚀 **API Gateway Service – Documentation**

## 🛠 Base URL

```
http://localhost:5001  
```

---

## Note

- The datbase has to run
- The database access service has to run 



## 1️⃣ **Search Blog Posts**

**Endpoint:**
`GET /search`

**Description:**
Searches blog posts by a given keyword.

**Query Parameters:**

| Param   | Type   | Required | Description                     |
| ------- | ------ | -------- | ------------------------------- |
| keyword | string | ✅ Yes    | The search term to query posts. |

**Example Request:**

```
GET /search?keyword=ai%20tools
```

**Example Response:**

```json
[
    {
        "title": "AI Tools for Productivity",
        "content": "...",
        "category": "technology",
        "date": "2025-05-01"
    },
    ...
]
```

---

## 2️⃣ **Explore Section**

**Endpoint:**
`GET blog/section/explore`

**Description:**
Fetches a list of articles from the "explore" section.

**Query Parameters:**

| Param | Type   | Required | Description                                     |
| ----- | ------ | -------- | ----------------------------------------------- |
| limit | number | ❌ No     | Max number of articles to return (default: 15). |

**Example Request:**

```
GET blog/section/explore?limit=10
```

**Example Response:**

```json
[
    {
        "title": "Breaking Tech News",
        "content": "...",
        "date": "2025-05-01"
    },
    ...
]
```

---

## 3️⃣ **Get Articles by Category**

**Endpoint:**
`GET blog/section/:category`

**Description:**
Fetches a paginated list of articles for a specific category.

**Path Parameters:**

| Param    | Type   | Required | Description                       |
| -------- | ------ | -------- | --------------------------------- |
| category | string | ✅ Yes    | The category name (e.g., "tech"). |

**Query Parameters:**

| Param | Type   | Required | Description                                |
| ----- | ------ | -------- | ------------------------------------------ |
| page  | number | ❌ No     | The page number (default: 1).              |
| limit | number | ❌ No     | Number of articles per page (default: 15). |

**Example Request:**

```
GET blog/section/technology?page=1&limit=5
```

**Example Response:**

```json
{
    "page": 1,
    "limit": 5,
    "total": 20,
    "articles": [
        {
            "title": "Tech Trends 2025",
            "content": "...",
            "date": "2025-04-15"
        },
        ...
    ]
}
```

---

## 4️⃣ **Get a Specific Article**

**Endpoint:**
`GET blog/section/:category/article/:articleName`

**Description:**
Fetches a specific article by category and article name.

**Path Parameters:**

| Param       | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| category    | string | ✅ Yes    | The category of the article.    |
| articleName | string | ✅ Yes    | The unique name of the article. |

**Example Request:**

```
GET blog/section/technology/article/ai-tools
```

**Example Response:**

```json
{
    "title": "AI Tools",
    "content": "Full article content here...",
    "category": "technology",
    "author": "John Doe",
    "date": "2025-04-10"
}
```

---

# ✅ **General Notes:**

* All routes use **RESTful** design principles.
* Backend **errors** return JSON like:

```json
{
    "error": "Failed to fetch data",
    "details": "HTTP error! Status: 500"
}
```

* For production, it’s recommended to:

  * Use environment variables for backend URLs.
  * Add authentication & rate limiting.
  * Validate incoming query parameters (e.g., using class-validator).

---

# 🔒 **Security Ideas (Future Enhancements):**

* API Key or JWT-based authentication.
* CORS configuration for specific origins.
* Rate limiting to prevent abuse.

