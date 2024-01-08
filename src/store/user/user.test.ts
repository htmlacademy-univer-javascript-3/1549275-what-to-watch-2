import { AuthorizationStatus } from '../../data/enums/authorization-status';
import { AuthData } from '../../data/types/auth-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { InitialState, initialState, userProcess } from './user.slices';

const mockUser: AuthData = { login: 'qqqq', password: '1234qwer'};
describe('user-reducer', () => {
  let state: InitialState;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('loginAction', () => {
    it('should set authorizationStatus Auth on fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockUser }).authorizationStatus)
        .toEqual(AuthorizationStatus.Auth);
    });
    it('should set authorizationStatus NoAuth on rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type, payload: mockUser }).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });
    it('should set hasError true on fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type, payload: mockUser }).hasError)
        .toBeTruthy();
    });
  });

  describe('logoutAction', () => {
    it('should set authorizationStatus NoAuth on fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });
    it('should set hasError false on fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.rejected.type }).hasError)
        .toBeFalsy();
    });
  });

  describe('checkAuthAction', () => {
    it('should set authorizationStatus Auth on fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockUser }).authorizationStatus)
        .toEqual(AuthorizationStatus.Auth);
    });
    it('should set authorizationStatus NoAuth on rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type, payload: mockUser }).authorizationStatus)
        .toEqual(AuthorizationStatus.NoAuth);
    });
  });
});
