
# iwarranty-cli

Develop a Node.js command-line app in TypeScript for iWarranty, aiding new customer onboarding by parsing Excel data, resolving errors, and generating a JSON search index. The output consists of JSON lines for a seamless update of the search index. This tool is intended for iWarranty's exclusive use over the next 4-8 weeks.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Installation

```bash
  git clone https://github.com/teslaji/iwarranty-cli.git
```

Install with pnpm

```bash
  cd iwarranty-cli
  pnpm install
  pnpm run dev
  pnpm run link-cli
  pnpm install -g . (this will link CLI globally)
```

Input Excel Sheet to convert into JSON

```bash
iwarranty process ~/path/to/excel
```

Search Function

```bash
iwarranty search <searchterm>
```

## Authors

- [@teslaji](https://www.github.com/teslaji)

## Enhancements

Test driven development with JEST.

Refined Full-text Search.

Implement elasticsearch with mainly three search strategy

1. multi-match term.
2. relevance score.
3. pagination.

This will lead to better indexing and resultant search.

Better Logging