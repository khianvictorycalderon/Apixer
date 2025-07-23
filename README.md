# Apixer

**Apixer** is a simple React-based API testing tool that allows developers to interact with APIs by specifying a URL, HTTP method, headers, and optional request body. It supports all common HTTP methods and returns the API response in a formatted output area.

## 🚀 Features

- Supports HTTP methods: GET, POST, PUT, PATCH, DELETE
- Allows custom headers (JSON format)
- Sends body data (for non-GET requests) in JSON format
- Displays response as formatted JSON or plain text
- Real-time feedback for success, warning, or error states

## 🛠 Tech Stack

- React (with Hooks)
- TypeScript
- Tailwind CSS

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/apixer.git
cd apixer
```

2. Install dependencies:

```bash
Copy
Edit
npm install
```

3. Start the development server:
`npm run dev`

Usage:
1. Enter the API URL you want to test.
2. Select the HTTP method.
3. Optionally, provide headers in JSON format.
4. For non-GET methods, enter body data in JSON format.
5. Click Test API.
6. View the output below the form.