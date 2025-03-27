import "./index.css";

const Teams = () => {
  return (
    <div className="content">
      <h1>Teams</h1>
      <div className="team-section">
        <div className="team-card">
          <h3>Product Team</h3>
          <p className="team-description">
            Driving product innovation and strategy.
          </p>
          <div className="team-member">
            <div className="avatar">EW</div>
            <div className="member-info">
              <strong>Emma Wilson</strong>
              <p className="role">Product Manager</p>
            </div>
          </div>
          <div className="team-member">
            <div className="avatar">FT</div>
            <div className="member-info">
              <strong>Frank Thomas</strong>
              <p className="role">Business Analyst</p>
            </div>
          </div>
        </div>

        <div className="team-card">
          <h3>QA Team</h3>
          <p className="team-description">Ensuring quality and reliability.</p>
          <div className="team-member">
            <div className="avatar">GL</div>
            <div className="member-info">
              <strong>Grace Lee</strong>
              <p className="role">QA Engineer</p>
            </div>
          </div>
          <div className="team-member">
            <div className="avatar">HK</div>
            <div className="member-info">
              <strong>Harry Kim</strong>
              <p className="role">Test Automation Specialist</p>
            </div>
          </div>
        </div>

        <div className="team-card">
          <h3>Development Team</h3>
          <p className="team-description">
            Building and deploying scalable solutions.
          </p>
          <div className="team-member">
            <div className="avatar">AB</div>
            <div className="member-info">
              <strong>Alice Brown</strong>
              <p className="role">Lead Developer</p>
            </div>
          </div>
          <div className="team-member">
            <div className="avatar">BG</div>
            <div className="member-info">
              <strong>Bob Green</strong>
              <p className="role">Frontend Engineer</p>
            </div>
          </div>
          <div className="team-member">
            <div className="avatar">CW</div>`
            <div className="member-info">
              <strong>Charlie White</strong>
              <p className="role">Backend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
