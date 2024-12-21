import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic/js": stylistic,
    },
    rules: {
      // 들여쓰기 2칸
      "@stylistic/js/indent": ["error", 2],
      // 큰따옴표 사용
      "@stylistic/js/quotes": ["error", "double"],
      // 세미콜론 필수
      "@stylistic/js/semi": ["error", "always"],
      // 여러 줄일 때 마지막 콤마 필수
      "@stylistic/js/comma-dangle": ["error", "always-multiline"],
      // 줄 끝 공백 금지
      "@stylistic/js/no-trailing-spaces": "error",
      // 콤마 앞뒤 공백 규칙
      "@stylistic/js/comma-spacing": ["error", { before: false, after: true }],
      // 블록 내부 공백 필수
      "@stylistic/js/block-spacing": ["error", "always"],
      // 세미콜론 앞뒤 공백 규칙
      "@stylistic/js/semi-spacing": "error",
      // 객체 키 뒤 공백 규칙
      "@stylistic/js/key-spacing": ["error", { beforeColon: false, afterColon: true }],
      // 화살표 함수 괄호 필수
      "@stylistic/js/arrow-parens": ["warn", "always"],
      // 화살표 앞뒤 공백 필수
      "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],
    },
  },
];

export default eslintConfig;
