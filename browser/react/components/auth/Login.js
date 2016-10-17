import React from 'react';

export default class extends React.Component {

    render() {
        return (
            <div className="signin-container">
                <div className="buffer local">
                    <form>
                        <div className="form-group">
                            <label>email</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control"  required />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">login</button>
                    </form>
                </div>
                <div className="or buffer">
                    <div className="back-line"><span>OR</span></div>
                </div>
                <div className="buffer oauth">
                    <p>
                        <a target="_self"
                           href="/auth/google"
                           className="btn btn-social btn-google">
                        <i className="fa fa-google"></i>
                        <span>Sign in with Google</span>
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}