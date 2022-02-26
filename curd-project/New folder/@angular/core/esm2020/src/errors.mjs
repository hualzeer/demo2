/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ERROR_LOGGER, ERROR_ORIGINAL_ERROR, ERROR_TYPE } from './util/errors';
export function getType(error) {
    return error[ERROR_TYPE];
}
export function getOriginalError(error) {
    return error[ERROR_ORIGINAL_ERROR];
}
export function getErrorLogger(error) {
    return error && error[ERROR_LOGGER] || defaultErrorLogger;
}
function defaultErrorLogger(console, ...values) {
    console.error(...values);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdFLE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBWTtJQUNsQyxPQUFRLEtBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQVk7SUFDM0MsT0FBUSxLQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUFjO0lBQzNDLE9BQU8sS0FBSyxJQUFLLEtBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxrQkFBa0IsQ0FBQztBQUNyRSxDQUFDO0FBR0QsU0FBUyxrQkFBa0IsQ0FBQyxPQUFnQixFQUFFLEdBQUcsTUFBYTtJQUN0RCxPQUFPLENBQUMsS0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VSUk9SX0xPR0dFUiwgRVJST1JfT1JJR0lOQUxfRVJST1IsIEVSUk9SX1RZUEV9IGZyb20gJy4vdXRpbC9lcnJvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZShlcnJvcjogRXJyb3IpOiBGdW5jdGlvbiB7XG4gIHJldHVybiAoZXJyb3IgYXMgYW55KVtFUlJPUl9UWVBFXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbmFsRXJyb3IoZXJyb3I6IEVycm9yKTogRXJyb3Ige1xuICByZXR1cm4gKGVycm9yIGFzIGFueSlbRVJST1JfT1JJR0lOQUxfRVJST1JdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3JMb2dnZXIoZXJyb3I6IHVua25vd24pOiAoY29uc29sZTogQ29uc29sZSwgLi4udmFsdWVzOiBhbnlbXSkgPT4gdm9pZCB7XG4gIHJldHVybiBlcnJvciAmJiAoZXJyb3IgYXMgYW55KVtFUlJPUl9MT0dHRVJdIHx8IGRlZmF1bHRFcnJvckxvZ2dlcjtcbn1cblxuXG5mdW5jdGlvbiBkZWZhdWx0RXJyb3JMb2dnZXIoY29uc29sZTogQ29uc29sZSwgLi4udmFsdWVzOiBhbnlbXSkge1xuICAoPGFueT5jb25zb2xlLmVycm9yKSguLi52YWx1ZXMpO1xufVxuIl19