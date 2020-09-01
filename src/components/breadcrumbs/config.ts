import {EPath} from "../../EPath";

export const MAP = {
  root: {
    title: "Организации и мероприятия",
    link: EPath.EVENTS
  },
  items: [
      {
          title: "{:name}",
          link: EPath.EVENT_PROFILE,
          parent: EPath.EVENTS
      },
      {
          title: "{:name}",
          link: EPath.USER_RESULT,
          parent: EPath.EVENT_PROFILE
      },
      {
          title: "{:name}",
          link: EPath.TRIAL_RESULT,
          parent: EPath.EVENT_PROFILE
      },
      {
          title: "{:name}",
          link: EPath.TRIAL_RESULT,
          parent: EPath.EVENT_PROFILE
      }
  ]
};