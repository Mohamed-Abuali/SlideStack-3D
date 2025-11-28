# zAxiesImagesScrolling

A small front‑end project that demonstrates a stacked image slider animated with GSAP. Five slides (image + caption) are layered using `z-index` and translated on the Y‑axis. Scrolling the mouse wheel triggers a timeline that rotates the stack to create a smooth, continuous carousel effect.

## Features
- GSAP‑powered timeline for smooth, sequenced transitions
- Stacked, layered slides using `z-index` to create depth
- Mouse wheel interaction to cycle slides forward/backward
- Simple data model for captions and image sources
- Minimal setup via CDN (no build step required)

## Tech Stack
- HTML/CSS for structure and styling
- JavaScript for DOM generation and animation
- GSAP 3 via CDN; optional `SplitText` plugin

## Getting Started (Windows)
1. Place `1.jpg` to `5.jpg` in the project directory alongside `index.html`.
2. Serve the folder over HTTP (opening `index.html` via `file://` can break module features and resource loading). Pick one option:
   - VS Code Live Server: open the folder in VS Code, right‑click `index.html`, choose “Open with Live Server”.
   - Node (npx serve):
     ```
     npx serve .
     ```
   - Node (http-server):
     ```
     npx http-server -p 8080 .
     ```
   - Python:
     ```
     py -m http.server 8080
     ```
3. Open `http://localhost:8080` (or the port shown) in your browser.

## How It Works
- DOM creation: `setTheSlider()` builds five `.slider` elements, each with an `<h1>` caption and `<img>` source from a simple array.
- Initial layout: elements are positioned with `gsap.set` to create a staggered stack (progressively shifted Y and `z-index`).
- Interaction: a `wheel` event listener creates a GSAP timeline when you scroll. The timeline:
  - Animates the top element out and then back into its “end” position
  - Moves the rest of the elements up one “slot” by applying stored `y`/`zIndex` values
  - Rotates the logical order so the carousel continues smoothly on subsequent scrolls
- SplitText: registered via GSAP to enable advanced text splitting effects if you choose to animate the captions more granularly.

## Usage
- Update captions and images in the array at the top of `app.js`.
- Ensure your images match the names used (`1.jpg`–`5.jpg`) or update the paths accordingly.
- Adjust animation parameters (duration, ease, offsets) inside the timeline to modify the feel of the rotation.
- Tweak depth and perspective in `style.css` (`.sliders { perspective: 1000px; }`) for a stronger 3D impression.

## Customization Tips
- Change `ease` values to `power3.inOut`, `expo.inOut`, or `back.inOut` for different motion profiles.
- Replace hard‑coded indices in animations with loops to support any number of slides.
- Use function‑based GSAP values to compute target positions from indices instead of measuring and mapping stored properties.
- If you don’t need SplitText, remove the plugin to reduce overhead.

## Troubleshooting
- Nothing animates:
  - Use a local HTTP server, not `file://`.
  - Check the browser console for syntax errors (e.g., `import`/`export` used in classic scripts).
- Images don’t appear:
  - Confirm `1.jpg`–`5.jpg` exist next to `index.html`, or correct the paths.
  - Quote attribute values in generated HTML so captions with spaces don’t break the DOM.
- Wheel scrolling does nothing:
  - Use `event.deltaY` to detect scroll direction; `wheelDelta` is deprecated in some browsers.
  - Ensure you aren’t creating new timelines while one is active; debounce or gate events.
- SplitText errors:
  - Some GSAP bonus plugins require a license. If the plugin fails to load via CDN, remove it or use a licensed build.

## Project Structure

zAxiesImagesScrolling/
├─ index.html      # markup and CDN script tags
├─ style.css       # theme and layout
├─ app.js          # DOM creation and GSAP animations
├─ 1.jpg .. 5.jpg  # slide images

