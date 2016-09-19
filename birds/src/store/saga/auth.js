import { take, call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import api from "../../api";

import * as c from "../constants.js";
import * as s from "../selectors.js";
import * as a from "../actions.js";

function* auth() {
    for (;;) {
        try {
            const action = yield take([
                c.LOGOUT_AUTH,
                c.LOGIN_AUTH,
                c.REGISTER_AUTH
            ]);
            switch (action.type) {
                case c.LOGIN_AUTH: {
                    const { email, password } = action.payload;
                    const { user, token } = yield call(login, email, password);
                    yield put(a.setAuth({
                        token,
                        ...user
                    }));
                    if (!user.teamnumber)
                        yield put(push("/selectTeam"));
                    else
                        yield put(push("/"));
                    break;
                }
                case c.LOGOUT_AUTH: {
                    yield call(logout);
                    yield put(push("/"));
                    break;
                }
                case c.REGISTER_AUTH: {
                    const user = yield select(s.getRegisterForm);
                    yield call(register, user);
                    yield call(login, user.email, user.password);
                    yield put(push("/selectTeam"));
                    break;
                }
                default:
                    break;
            }
        } catch (e) {
            yield put(a.setAuth(e));
        }
    }
}

export function* login(email, password) {
    const res = yield call(api.auth.login, email, password);
    if (res.error) throw new Error(res.error.message);
    return res.data;
}

export function* logout() {
    yield put(a.resetAuth());
}

export function* register(user) {
    const res = yield call(api.auth.register, user);
    if (res.error) throw new Error(res.error.message);
    return res.data.user;
}

export function* getUser(id, token) {
    const res = yield call(api.auth.getUser, id, token);
    if (res.error) throw new Error(res.error.message);
    return res.data.user;
}

export default auth;
