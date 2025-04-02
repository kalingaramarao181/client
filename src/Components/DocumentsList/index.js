import "./index.css";

import { baseUrl } from "../../Config/constants";

const DocumentsList = ({documents}) => {
    
    
      const getDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
      };
    
      const handleView = (filePath) => {
        window.open(`${baseUrl}/${filePath}`, "_blank");
      };

    return (
        <div className="ezy-document-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Last Change</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {documents.map((document, index) => (
              <tr key={index}>
                <td>Complete with Docusign:{document.title}</td>
                <td className={`status-${document.status.toLowerCase()}`}>
                  {document.status}
                </td>
                <td>{getDate(document.created_at)}</td>
                <td>
                  
                    <button
                      className="ezy-btn-download"
                      onClick={() => handleView(document.file_path)}
                    >
                      Download
                    </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
export default DocumentsList;