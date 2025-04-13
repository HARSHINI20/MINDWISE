import React, { useState } from "react";
import MenHelpDesk from "./MenHelpDesk";
import WomenHelpDesk from "./WomenHelpDesk";
import HelplineDirectory from "./HelplineDirectory";

import "./Helpdesk.css";

const Helpdesk = () => {
  const [page, setPage] = useState("men");

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setPage("men")}>Men's Help Desk</button>
        <button onClick={() => setPage("women")}>Women's Help Desk</button>
        <button onClick={() => setPage("helpline")}>Helpline Directory</button>
      </nav>

      {page === "men" && <MenHelpDesk />}
      {page === "women" && <WomenHelpDesk />}
      {page === "helpline" && <HelplineDirectory />}
    </div>
  );
};

export default Helpdesk;