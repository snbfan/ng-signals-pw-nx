import { SubmittedStateService } from './submitted-state.service';

describe('Service SubmittedStateService:', () => {
  let submittedStateService: SubmittedStateService;

  beforeEach(() => {
    submittedStateService = new SubmittedStateService();
  });

  describe('setter submitted', () => {
    it('should push correct value into Signal', () => {
      submittedStateService.submitted = true;
      expect(submittedStateService.submitted()).toEqual(true);
    });
  });

  describe('getter submitted', () => {
    it('should return Signal', () => {
      const result = submittedStateService.submitted;
      expect(result).toBeDefined();
      expect(typeof result).toBe('function');
    });
  });
});
