import {
    ClerkProvider,
    SignedIn,
    SignIn,
    SignUp,
    UserButton,
  } from "@clerk/clerk-react";
  import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
  if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
   
  const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
   
  function PublicPage() {
    return (
      <>
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">

    <a className="navbar-brand" href="#">ESD</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Overview</a>
        </li>
        
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success me-2" type="submit">Search</button>
        <UserButton />
      </form>
    
    </div>
   
  </div>

 
</nav>

      </>
    );
  }
   
   
  function ClerkProviderWithRoutes() {
    const navigate = useNavigate();
   
    return (
      <ClerkProvider
        publishableKey={clerk_pub_key}
        navigate={(to) => navigate(to)}>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
            />
            <Route
              path="/protected"
              element={
                <SignedIn>
                  <PublicPage />
                </SignedIn>
              }
            />
          </Routes>
        </ClerkProvider>
      );
  }
   
  function Nav() {
    return (
      <BrowserRouter>
        <ClerkProviderWithRoutes />
        
      </BrowserRouter>
      
    );
    
  }
  
  export default Nav;