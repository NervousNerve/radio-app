import { Route } from "react-router";

import UserChannels from "./UserChannels";
import UserPrograms from "./UserPrograms";

function User() {
  return (
    <div>
      <Route path="/user/channels" component={UserChannels} />
      <Route path="/user/programs" component={UserPrograms} />
    </div>
  );
}

export default User;
