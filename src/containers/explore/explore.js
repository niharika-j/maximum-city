import React, { Component } from 'react';
import './explore.css';
import places from '../../shared/places.js';
import appRoutes from '../../shared/appRoutes.js';
import {Link} from "react-router-dom";


class Explore extends Component {
  state = {
      query: '',
      filteredPlaces: places,
      tags : {
          food: false,
          nature: false,
          touristSpots: false,
          shopping: false
      }
  }
  search = event => {
    this.setState({query: event.target.value});
    let allPlaces = JSON.parse(JSON.stringify(places));
    let query = event.target.value.toLowerCase();
    let filteredPlacesByName = allPlaces.filter(place => place.name.toLowerCase().indexOf(query)>-1);
    let filteredPlacesByContent = allPlaces.filter(place => place.fullText.toLowerCase().indexOf(query)>-1&&filteredPlacesByName.indexOf(place)==-1);
    let filteredPlaces = filteredPlacesByName.concat(filteredPlacesByContent);
    this.setState({filteredPlaces: filteredPlaces});
  };

  filterByTag = (tag) => {
    let allPlaces = JSON.parse(JSON.stringify(places));
    this.setState({query: ''});

    let currentTags = JSON.parse(JSON.stringify(this.state.tags));
    if(tag=='food'){
        currentTags.food = !currentTags.food;
    }
    else if(tag=='nature'){
        currentTags.nature = !currentTags.nature;
    }
    else if(tag=='shopping'){
        currentTags.shopping = !currentTags.shopping;
    }
    else{
        currentTags.touristSpots = !currentTags.touristSpots;
    }
    this.setState({tags: currentTags}, () => {
        let selectedTags = [];
        if(this.state.tags.food){
            selectedTags.push('food');
        }
        if(this.state.tags.nature){
            selectedTags.push('nature');
        }
        if(this.state.tags.touristSpots){
            selectedTags.push('tourist spots');
        }
        if(this.state.tags.shopping){
            selectedTags.push('shopping');
        }
        
        let filteredPlaces = [];
        if(selectedTags.length===0){
            filteredPlaces = allPlaces;
        }
        else{
            for(var i=0;i<allPlaces.length;i++){
                let matches = allPlaces[i].tags.some(tag=> selectedTags.indexOf(tag) >= 0)
                if(matches){
                    filteredPlaces.push(allPlaces[i]);
                }
            }
        }

        this.setState({filteredPlaces: filteredPlaces});
    });

  }
  render(){
    return (
        <div className="explore">
            <div className="rowContainer">
                <div className="searchBar">
                    <i className="searchIcon fas fa-search"></i>
                    <input id="search" type="text" placeholder="Search name or content" value={this.state.query} onChange={e => this.search(e)} />
                </div>
            
                <div className="secondRowContainer">
                    <div className="placesList">
                        {this.state.filteredPlaces.map((place) => {
                            return (
                                <div className="placeItem" key={place.id}>
                                    <div className="placeImage"><img src={place.imgSrc} alt={place.name} /></div>
                                    <div className="placeDetails">
                                        <div className="placeName"><Link to={`${appRoutes.explore}/${place.id}`}>{place.name}</Link></div>
                                        <div className="placeDesc">{place.shortDesc}</div>
                                        <div className="readMore"><Link to={`${appRoutes.explore}/${place.id}`}>Read More ></Link></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="tags">
                        <div id="tagsTitle">Tags</div>
                        <div className="tagItems">
                            <label>
                                <input type="checkbox" value={this.state.tags.food} onChange={() => this.filterByTag('food')} /><span>Food</span>
                            </label>
                            <label>
                                <input type="checkbox" value={this.state.tags.nature} onChange={() => this.filterByTag('nature')} /><span>Nature</span>
                            </label>
                            <label>
                                <input type="checkbox" value={this.state.tags.touristSpots} onChange={() => this.filterByTag('tourist spots')} /><span>Tourist Spots</span>
                            </label>
                            <label>
                                <input type="checkbox" value={this.state.tags.shopping} onChange={() => this.filterByTag('shopping')} /><span>Shopping</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Explore;
