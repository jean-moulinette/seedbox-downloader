const path = require('path');

module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
        "import/prefer-default-export": [0],
    },
    "env": {
        "browser": true,
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "client/config/webpack.dev.js",
            },
        },
    },
};