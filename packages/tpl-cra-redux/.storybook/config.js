import { configure, addParameters, addDecorator } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";

function loadStories() {
  require("../stories");
}

configure(loadStories, module);

// viewports  https://github.com/storybooks/storybook/blob/next/addons/viewport/README.md
addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

// info https://github.com/storybooks/storybook/blob/next/addons/info/README.md
addDecorator(withInfo);

// konobs  https://github.com/storybooks/storybook/blob/next/addons/knobs/README.md
addDecorator(withKnobs);
