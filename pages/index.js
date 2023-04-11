import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState(null);
  const [response, setResponse] = useState(null);
  const [errorInfo, setErrorInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [javaScriptComp, setJavaScriptComp] = useState([]);

  const getDomainInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/search/", {
        params: { keyword },
      });
      const javaScriptCom = await axios.get("api/javaScript-vulnarable/", {
        params: { keyword },
      });
      console.log(javaScriptCom);
      const { data } = res;
      setLoading(false);
      setResponse(data);
      setJavaScriptComp(javaScriptCom);
    } catch (error) {
      setLoading(false);
      setErrorInfo(error.response.data);
    }
  };
  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-open-sans items-center min-h-screen">
      <h1 className="text-6xl text-active font-bold font-active mt-10">
        Domain Search
      </h1>
      <h2 className="text-primary text-2xl mt-6">
        Check information of any domain.
      </h2>

      <form
        className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex"
        onSubmit={(e) => {
          getDomainInfo();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          className="block w-1/3 rounded-sm px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter your website URL"
          onChange={(e) => {
            setKeyword(e.target.value);
            setResponse(null);
            setErrorInfo(null);
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-sm px-5 py-3 bg-active text-base text-primary font-bold focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
            type="submit"
          >
            {loading ? <>Loading..</> : <>Search</>}
          </button>
        </div>
      </form>
      {errorInfo && (
        <div className="mt-10 max-w-3xl w-full">
          <h3 className="text-danger text-center text-xl">
            Error: {errorInfo}
          </h3>
        </div>
      )}
      {response && (
        <div className="mt-10 max-w-3xl w-full">
          <h3 className="text-primary text-center text-xl">
            The information of this {keyword} domain is{" "}
            {response['Domain Name'] !== null ? (
              <span className="text-active">available</span>
            ) : (
              <span className="text-danger">not available</span>
            )}
          </h3>
          {response['Domain Name'] !== null && (
            <div>
              <h3 className="mt-10 text-primary text-xl">Website information:</h3>
              <table className="w-full text-primary font-semibold mt-2 md:text-sm">
                <tbody className="bg-primary rounded-sm divide-y text-background overflow-x-scroll">
                <tr>
                    <td className="px-4 py-4">Whois information</td>
                    <td className="border-l px-4 py-4">
                      IP reputation
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Domain: {response['Domain Name']}</td>
                    <td className="border-l px-4 py-4">
                      Target : {response['target']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Registrar: {response['Registrar']}</td>
                    <td className="border-l px-4 py-4 capitalize">
                      Title : {response['title']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Registrar URL: {response['Registrar URL']}</td>
                    <td className="border-l px-4 py-4 capitalize">
                      DA_SCORE : {response['da_score']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Registrar WHOIS Server: {response['whois.registrarsafe.com']}</td>
                    <td className="border-l px-4 py-4">
                      PA_SCORE : {response['pa_score']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Created Date: {response['Created Date']}</td>
                    <td className="border-l px-4 py-4">
                      TOTAL_BACKLINK : {response['total_backlink']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Expiry Date : {response['Expiry Date']}</td>
                    <td className="border-l px-4 py-4">
                      SPAM_SCORE : {response['spam_score']}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Registrar Contact Email: {response['Registrar Abuse Contact Email']}</td>
                    <td className="border-l px-4 py-4">
                      
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Registrar Contact Phone: {response['Registrar Abuse Contact Phone']}</td>
                    <td className="border-l px-4 py-4">
                      
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-10 text-center">
              </div>
            </div>
          )}
        </div>
      )}
      {(javaScriptComp.length) && (
       <div className="mt-10 max-w-3xl w-full">
        <h3 className="text-primary text-center text-xl">
            The Vulnarable components on this {keyword} website is{" "}
            {/* {javaScriptComp.map(comp => <div>{comp}</div>)} */}
            {console.log(javaScriptComp.length)}
          </h3>
       </div> 
      )}
    </div>
  );
}
