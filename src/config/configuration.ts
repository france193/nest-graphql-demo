import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const ENV = process.env.NODE_ENV;
const YAML_CONFIG_FILENAME = join(__dirname, '..', '..', '.env', `${ENV}.yaml`);

export default () => {
  const config: Record<string, any> = yaml.load(
    readFileSync(YAML_CONFIG_FILENAME, 'utf8'),
  ) as Record<string, any>;
  return config;
};
