export default function({ store, route, redirect }) {
    if (!store.state.auth.isLoggedIn) {
        redirect("/login");
    }
}