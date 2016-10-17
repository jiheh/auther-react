import React from 'react';

export default class extends React.Component {


    render() {
        return (
            <div className="signin-container">
                <div className="buffer local">
                    <form >
                        <div className="form-group">
                            <label>email</label>
                            <input type="text" className="form-control"  required />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control"  required />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">login</button>
                    </form>
                </div>
            </div>
        );
    }

}