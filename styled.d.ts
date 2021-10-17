export *  from 'styled-components';
import { ThemeType } from 'ui/helpers/colors';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}