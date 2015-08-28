API Demo
========

This is a simple demo of how to interact with an API.

The following routes are available:

| Method | Route              | Data Expected | Response        |
|--------|--------------------|---------------|-----------------|
| GET    | `/api/animals`     | None          | List of animals |
| GET    | `/api/animals/*id*`| None          | Specific animal |
| POST   | `/api/animals`     | JSON animal   | success status  |
| PUT    | `/api/animals/*id*`| JSON animal   | success status  |
| DELETE | `/api/animals/*id*`| None          | success status  |

JSON animal form:

```json
{
  "type": "human",
  "name": "Parker",
  "age": 23
}
```