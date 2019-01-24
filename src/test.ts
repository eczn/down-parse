import { render, use } from "./index"; 

use({
    parser(token) {
        return token
    }
})

render(
    `# 123`
);
