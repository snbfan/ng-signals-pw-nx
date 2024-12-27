import { ModuleWithProviders } from '@angular/core';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';

export function getTranslocoModule(options: TranslocoTestingOptions = {}): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en',
      missingHandler: {
        logMissingKey: true,
        useFallbackTranslation: true,
        allowEmpty: true,
      },
    },
    preloadLangs: true,
    ...options,
  });
}
