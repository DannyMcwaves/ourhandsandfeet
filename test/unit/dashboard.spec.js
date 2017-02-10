import {Dashboard} from '../../src/dashboard-routes/dashboard';
import {Container} from "aurelia-dependency-injection";
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

class HttpMock {
    // this one catches the ajax and then resolves a custom json data.
    // real api calls will have more methods.
    fetch() {
        return Promise.resolve('{"name": "John Fitzgerald", "age": 20}')
    }
}

class AuthServiceMock {
    // basic auth functions.
    isAuthenticated() {
        this.authenticated = true;
        return this.authenticated;
    }
    authenticate() {
        this.authenticate = true;
        return Promise.resolve("user is authenticated");
    }
    setToken(token) {
        this.token = token;
    }
    getTokenPayload() {
        return Promise.resolve(this.token)
    }
}

class RouterMock {
    map(routes) {
        return this.routes instanceof Array ? this.routes : [this.routes];
    }
    navigate(route) {
        return route;
    }
}

describe ("the Dashboard Module", () => {
    let dashboard;

    describe("Dashboard DI", () => {
        beforeEach(() => {
            dashboard = new Dashboard(new AuthServiceMock, new HttpMock, null, new RouterMock);
            spyOn(new HttpMock(), "fetch");
        })

        it("should authenticate and return feedback", done =>{
            dashboard.auth.authenticate().then(data => {
                expect(data).toContain("authenticated");
            }).catch((e) => {
                expect(e).toThrow();
            })
            done();
        });

        it("should check if the user is authenticated", done => {
            expect(dashboard.auth.isAuthenticated()).toBeTruthy();
            done();
        });

        it("should fetch some json data after api call", done => {
            dashboard.httpClient.fetch("/some/data").then(data => {
                expect(data).toBeDefined(); // check if the data is defined.
                expect(typeof data).toBe("string"); // check if the data is string
                expect(typeof JSON.parse(data)).toBe("object"); // try to parse and confirm it return json.
            }, o => {
                // else catch the reject.
                expect(o).toBeUndefined();
            })
            done();
        })

        it("should confirm route by returning the currently navigated route", done => {
            expect(dashboard.router.navigate(dashboard.types[0])).toBe("Charity");
            expect(dashboard.router.navigate(dashboard.types[1])).toBe("Volunteer");
            done();
        })
    })


    describe("Staging Dashboard", () => {
        beforeEach(() => {
            dashboard = StageComponent
                .withResources("src/dashboard")
                .inView("<dashboard></dashboard>")
                .boundTo({user: {name: "John Fitzgerald"}})
        })
        it("staging the dashboard", done => {
            // let strap = dashboard.create(bootstrap)
            // custom element incorporated. must be pure elements.
            // dashboard.create(bootstrap).then(() => {
                // console.log(document);
            // }).catch(e => { console.log(e.toString()); } )
            done();
        })

    });


})
