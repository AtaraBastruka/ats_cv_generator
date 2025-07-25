import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
    transpilePackages: ['@react-pdf/renderer']
};

export default withNextIntl(config);
