import "./index.css";

const Overview = () => {
    return (
        <section className="overview">
            <div className="card card-signed">
                <i className="card-icon fas fa-file-signature"></i>
                <h3 className="card-title">Signed Documents</h3>
                <p className="card-count">200</p>
            </div>
            <div className="card card-pending">
                <i className="card-icon fas fa-hourglass-half"></i>
                <h3 className="card-title">Pending Signatures</h3>
                <p className="card-count">12</p>
            </div>
            <div className="card card-expiring">
                <i className="card-icon fas fa-exclamation-circle"></i>
                <h3 className="card-title">Expiring Soon</h3>
                <p className="card-count">7</p>
            </div>
            <div className="card card-total">
                <i className="card-icon fas fa-folder-open"></i>
                <h3 className="card-title">Total Documents</h3>
                <p className="card-count">350</p>
            </div>
        </section>
    );
};

export default Overview;
