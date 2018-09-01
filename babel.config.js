"use strict";

module.exports = (api) => {
    api.cache(true);
    
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    "modules": process.env.NODE_ENV === "production"
                }
            ],
            "@babel/preset-react"
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    };
};