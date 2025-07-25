import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError, delay } from 'rxjs/operators';

interface EmailAvailabilityResponse {
  isAvailable: boolean;
}

export function emailAvailabilityValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const apiUrl = process.env.API_BASE_URL;

    if (!control.value || control.invalid) {
      return of(null);
    }

    return timer(400).pipe(
      delay(500),
      switchMap(() =>
        http
          .post<EmailAvailabilityResponse>(`${apiUrl}/auth/email-available`, {
            email: control.value,
          })
          .pipe(
            map((res: EmailAvailabilityResponse) =>
              res.isAvailable ? null : { emailTaken: true }
            ),
            catchError(() => of(null)) //
          )
      )
    );
  };
}
