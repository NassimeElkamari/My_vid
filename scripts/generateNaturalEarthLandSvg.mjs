import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error("Usage: node generateNaturalEarthLandSvg.mjs <input.geojson> <output.svg>");
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const project = (longitude, latitude) => [
  ((longitude + 180) / 360 * 1000).toFixed(2),
  ((90 - latitude) / 180 * 500).toFixed(2),
];

const rings = source.features.flatMap((feature) => {
  return feature.geometry.type === "Polygon"
    ? feature.geometry.coordinates
    : feature.geometry.coordinates.flat();
});

const paths = rings
  .map((ring) => {
    return `${ring
      .map((point, index) => {
        const [x, y] = project(point[0], point[1]);
        return `${index === 0 ? "M" : "L"}${x} ${y}`;
      })
      .join(" ")} Z`;
  })
  .join(" ");

const svg = `<!-- Natural Earth ne_110m_land, public domain. Equirectangular (Plate Carree) projection. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500">
  <path d="${paths}" fill="#2B6568" stroke="#70B8AC" stroke-width="1.5" fill-rule="evenodd"/>
</svg>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg);
