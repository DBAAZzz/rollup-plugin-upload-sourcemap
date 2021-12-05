import { Plugin } from 'rollup';
export interface Options {
    delSourceMap?: boolean;
}
export default function PluginUpload(userOptions?: Options): Plugin;
