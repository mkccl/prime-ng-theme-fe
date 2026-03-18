import { SIDEBAR_BLOCKS } from './block-definition';

describe('BlockDefinition', () => {
  it('should export 10 sidebar blocks', () => {
    expect(SIDEBAR_BLOCKS.length).toBe(10);
  });

  it('should have unique IDs for all blocks', () => {
    const ids = SIDEBAR_BLOCKS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have all required fields for each block', () => {
    for (const block of SIDEBAR_BLOCKS) {
      expect(block.id).toBeTruthy();
      expect(block.name).toBeTruthy();
      expect(block.description).toBeTruthy();
      expect(block.category).toBeTruthy();
      expect(block.previewComponent).toBeTruthy();
      expect(block.htmlCode).toBeTruthy();
    }
  });

  it('should have category "sidebar" for all blocks', () => {
    for (const block of SIDEBAR_BLOCKS) {
      expect(block.category).toBe('sidebar');
    }
  });
});
