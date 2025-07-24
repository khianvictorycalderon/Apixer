import { useState, type FormEvent } from "react";

const fetchDataDefaultValue = `{
  "API_KEY": "X-2DI3ASXAB-31DVD"
}
`;

const headerDataDefaultValue = `{
  "name": "John Doe",
  "age": 18,
  "desc": "A fictional character..."
}
`;

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
const Methods = ["GET", "POST", "PATCH", "PUT", "DELETE"];

interface FeedbackProps {
  type: "default" | "success" | "warning" | "error";
  message: string;
}

const FeedbackColors = {
  default: "text-black",
  success: "text-green-600",
  warning: "text-yellow-400",
  error: "text-red-600"
}

export default function App() {

  const [api, setApi] = useState<string>("");
  const [headers, setHeaders] = useState<string>(headerDataDefaultValue);
  const [method, setMethod] = useState<Method>("GET");
  const [fetchData, setFetchData] = useState<string>(fetchDataDefaultValue);
  const [output, setOutput] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackProps>({
    type: "default",
    message: ""
  })

  const handleTestAPI = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!api) {
      setFeedback({ type: "error", message: "API URL is required!" });
      return;
    }

    let bodyData: any = null;
    let parsedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Parse fetchData if method is not GET
    try {
      if (method !== "GET") {
        bodyData = JSON.parse(fetchData);
      }
    } catch (err) {
      setFeedback({ type: "error", message: "Invalid JSON format in Fetch Data." });
      return;
    }

    // Parse headers input if provided
    if (headers.trim()) {
      try {
        const customHeaders = JSON.parse(headers);
        if (typeof customHeaders !== "object" || Array.isArray(customHeaders)) {
          throw new Error("Headers must be a valid JSON object.");
        }
        parsedHeaders = { ...parsedHeaders, ...customHeaders };
      } catch (err: any) {
        setFeedback({ type: "error", message: `Invalid Headers JSON: ${err.message}` });
        return;
      }
    }

    setFeedback({ type: "default", message: "Fetching..." });

    try {
      const response = await fetch(api, {
        method,
        headers: parsedHeaders,
        ...(method !== "GET" && { body: JSON.stringify(bodyData) }),
      });

      const contentType = response.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      setOutput(typeof data === "string" ? data : JSON.stringify(data, null, 2));
      setFeedback({
        type: response.ok ? "success" : "error",
        message: response.ok ? "API request successful." : `API error: ${response.statusText}`,
      });
    } catch (error: any) {
      setOutput("");
      setFeedback({
        type: "error",
        message: `Request failed: ${error.message || "Unknown error"}`,
      });
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Apixer</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Test any API and see the results.</p>
        <p className="text-lg/8 text-gray-600">Created by: <a className="text-purple-800 underline" href="https://khian.netlify.app/" target="_blank">Khian Victory D. Calderon</a></p>
      </div>
      <form onSubmit={handleTestAPI} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="api_link" className="block text-sm/6 font-semibold text-gray-900">
              API URL / URI:
            </label>
            <div className="mt-2.5">
              <input
                id="api_link"
                name="api_link"
                type="text"
                autoComplete="organization"
                value={api}
                onChange={(e) => setApi(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                placeholder="Enter API..."
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="headers" className="block text-sm/6 font-semibold text-gray-900">
              Headers (Optional):
            </label>
            <div className="mt-2.5">
              <textarea
                id="headers"
                name="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                rows={5}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                placeholder="Enter JSON data..."
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="method" className="block text-sm/6 font-semibold text-gray-900">
              Method:
            </label>
            <div className="mt-2.5">
              <select value={method} onChange={(e) => setMethod(e.target.value as Method)} className="w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                {Methods.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fetch_data" className="block text-sm/6 font-semibold text-gray-900">
              Fetch Data: <br/>
              <i>(Data to send in the API in JSON format)</i>
            </label>
            <div className="mt-2.5">
              <textarea
                id="fetch_data"
                name="fetch_data"
                value={fetchData}
                onChange={(e) => setFetchData(e.target.value)}
                rows={10}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                placeholder="Enter JSON data..."
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
            {feedback.message && (
              <p className={`${FeedbackColors[feedback.type]} font-bold block text-sm/6 text-gray-900 text-center mb-4`}>
                {feedback.message}
              </p>
            )}
          <input type="submit" value="Test API" className="hover:cursor-pointer block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
        </div>
        <div className="sm:col-span-2 mt-8">
          <label htmlFor="output" className="block text-sm/6 font-semibold text-gray-900">
            Output Data:
          </label>
          <div className="mt-2.5">
            <textarea
              id="output"
              name="output"
              value={output}
              rows={20}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              readOnly
              placeholder="Output will display here if there is any..."
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} Khian Victory D. Calderon. All rights reserved.
          </p>
        </div>
      </form>
    </div>
  )
}
