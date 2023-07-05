import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

class App extends Component {
  state = {packagesList: [], isLoading: true}

  componentDidMount() {
    this.getPackages()
  }

  getPackages = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {packages} = data
    const listOfPackages = packages.map(eachPackage => ({
      id: eachPackage.id,
      name: eachPackage.name,
      imageUrl: eachPackage.image_url,
      description: eachPackage.description,
    }))
    this.setState({packagesList: listOfPackages, isLoading: false})
  }

  render() {
    const {packagesList, isLoading} = this.state
    console.log(packagesList)
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="list-container">
            {packagesList.map(eachPackage => (
              <li className="list-item" key={eachPackage.id}>
                <img
                  src={eachPackage.imageUrl}
                  alt={eachPackage.name}
                  className="package-image"
                />
                <div className="container">
                  <h1 className="name">{eachPackage.name}</h1>
                  <p className="description">{eachPackage.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
