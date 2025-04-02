import "./index.css";
import Header from "../Header";
import Progress from "../Progress";
import UploadDocumentCard from "../UploadDocumentCard";
import DocumentsList from "../DocumentsList";

const DashboardHome = ({ shortName, userDetails, documents }) => {

  const tamplateList = [
    { name: "Employment Eligibility Verification: I-9" },
    { name: "Sample W9" },
  ];


  return (
    <div className="ezy-container">
      <div className="ezy-main">
        <Header documents={documents} fullName={userDetails.fullName} shortName={shortName} />
        <Progress />

        <div className="ezy-grid">
          <UploadDocumentCard fullName={userDetails.fullName}/>

          {tamplateList.map((template, index) => (
            <div key={index} className="ezy-card">
              <p className="ezy-card-title">Starter Templates</p>
              <div className="ezy-file-icon">📄</div>
              <p className="ezy-card-desc">{template.name}</p>
            </div>
          ))}
        </div>
        <DocumentsList documents={documents}/>

      </div>
    </div>
  );
}

export default DashboardHome;
