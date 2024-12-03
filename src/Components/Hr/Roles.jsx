export default function Roles() {
    return (
      <div className="hrmaindiv">
        <div className="card" style={{ borderRadius: "0px" }}>
          <p>Roles Management</p>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ROLE ID</th>
                <th>ROLE NAME</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Sample data */}
                <td>1</td>
                <td>Manager</td>
                <td>Oversees project and team operations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  