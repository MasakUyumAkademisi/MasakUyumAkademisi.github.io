import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Academic transfer preserves 14 complete chapters and 28 recall prompts", async () => {
  const data = JSON.parse(await readFile(new URL("../app/academic-content.json", import.meta.url), "utf8"));
  assert.equal(Object.keys(data).length, 14);
  let sections = 0;
  for (const chapter of Object.values(data)) {
    sections += chapter.lecture.length;
    assert.equal(chapter.recallQuestions.length, 2);
    assert.ok(chapter.wordCount >= 850);
    assert.ok(chapter.sources.every((source) => source.url.startsWith("https://")));
    for (const section of chapter.lecture) {
      assert.equal(section.body, section.paragraphs.join("\n\n"));
      assert.ok(section.sourceTrace);
    }
  }
  assert.equal(sections, 134);
});
