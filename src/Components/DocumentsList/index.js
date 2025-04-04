import "./index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlinePending } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { baseUrl } from "../../Config/constants";
import { useState } from "react";
import DocumentUpdateForm from "../DocumentUpdateForm";

const DocumentsList = ({documents}) => {

  const [openUpdateDocument, setOpenUpdateDocument] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  
    
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

      const getStatusColor = (documentStatus) => {
        if (documentStatus === "pending") {
          return "#FFA500"; 
        } else if (documentStatus === "signed") {
          return "#32CD32";
        } else if (documentStatus === "rejected") {
          return "#FF0000";
        }
      }

      const getStatusIcon = (documentStatus) => {
        if (documentStatus === "pending") {
          return <MdOutlinePending className="status-icon"/>; 
        } else if (documentStatus === "signed") {
          return <AiFillCheckCircle  className="status-icon"/>; 
        } else if (documentStatus === "rejected") {
          return <ImCross className="status-icon" />;
        }
        }
    
      const handleView = (filePath) => {
        window.open(`${baseUrl}/${filePath}`, "_blank");
      };

    return (
      <>
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
                <td style={{color: getStatusColor(document.status), fontWeight: "bold"}} className={`status-${document.status.toLowerCase()} documet-status`}>
                 {getStatusIcon(document.status)} {document.status}
                </td>
                <td>{getDate(document.created_at)}</td>
                <td className="ezy-documents-action">
                  
                    <button
                      className="ezy-btn-download"
                      onClick={() => handleView(document.file_path)}
                    >
                      Download
                    </button>
                    {document.status === "pending" && <button
                      className="ezy-btn-sign"
                      onClick={() => {
                        setOpenUpdateDocument(true);
                        setDocumentId(document.id);
                      }}
                    >
                      Sign
                    </button>}
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openUpdateDocument && <DocumentUpdateForm onClose={() => setOpenUpdateDocument(false)} open={openUpdateDocument} documentId={documentId}/>}
      </>
    )
}
export default DocumentsList;