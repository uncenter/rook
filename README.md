<div align="center">
  <img src="./assets/rook.png" width="100" />
  <h1>Rook</h1>
</div>

Mediocre chess application written with [Vue](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tauri](https://tauri.app/).

## Usage

```sh
git clone https://github.com/uncenter/rook.git
pnpm install
```

### Web

```
pnpm dev
```

### Desktop (Tauri app)

```
pnpm tauri dev
# or
pnpm tauri build
```

## Roadmap

- [x] Basic chessboard layout
- [x] Moveable pieces
- [x] Implement available moves function
- [x] Flip board after each turn
- [ ] Implement check and checkmate states
- [ ] Implement [castling](https://en.wikipedia.org/wiki/Castling?useskin=vector), [en passant](https://en.wikipedia.org/wiki/En_passant)
- [ ] Implement pawn promotions
- [ ] Add homescreen interface
  - [ ] New game, load from save
  - [ ] Settings
  - [ ] Theme customization
- [ ] Play against a bot

## Attribution

Chess piece icons (and the logo of this project, though adapted) were sourced from [Category:SVG chess pieces - Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces) and used under the GNU GPL license. All credit in that regard goes to [Cburnett](https://en.wikipedia.org/wiki/User:Cburnett) for their work in creating the icons.

## License

[GPL-3.0](LICENSE)
