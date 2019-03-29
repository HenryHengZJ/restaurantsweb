import React, { Component } from 'react';
import { Button, Row, Col, Card, CardHeader, CardBody, Table, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem,} from 'reactstrap';
import './styles.css'

const items = [
  {
    src: 'https://cdn.gobankingrates.com/wp-content/uploads/2017/10/MAIN-rib-eye-steak-fries-848x477.jpg',
    altText: 'Slide 1',
    caption: 'Essence Bistro in Swords, Co. Dublin, offers express lunch, lunch, early bird, dinner and special offer menus of locally sourced, high quality, bistro style food, cooked by award winning chefs. Its what your knife and fork have been waiting for!',
    restaurantname: 'Brizzy Bristo'
  },
  {
    src: 'https://www.eatthis.com/wp-content/uploads//media/images/ext/891825630/pad-thai.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    restaurantname: 'Special Thai'
  },
  {
    src: 'https://media.pixcove.com/C/6/3/Prawn-Drink-Food-Food-Pasta-Restaurant-Free-Image--1080.jpg',
    altText: 'Slide 3',
    caption: 'Da Mimmo Italian Restaurant Dublin was opened in 2010 by Tino Fuscardi. Our dishes have been developed over past generations to deliver the most authentic Italian food in Dublin. Da Mimmo is a family run Italian restaurant located in Dublin 3. We are well known in Dublin for our homemade wood fired Pizzas, Pasta & Anti Pasti; delicious desserts and a wide range of best Italian Wines. LovinDublin described Da Mimmo as an "Italian Gem" and we were listed in the top 10 Italian restaurants in Dublin.',
    restaurantname: 'Da Mimmo Italian'
  },
];

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      items: [
        {
          src: 'https://cdn.gobankingrates.com/wp-content/uploads/2017/10/MAIN-rib-eye-steak-fries-848x477.jpg',
          altText: 'Slide 1',
          caption: 'Essence Bistro in Swords, Co. Dublin, offers express lunch, lunch, early bird, dinner and special offer menus of locally sourced, high quality, bistro style food, cooked by award winning chefs. Its what your knife and fork have been waiting for!',
          restaurantname: 'Brizzy Bristo'
        },
        {
          src: 'https://www.eatthis.com/wp-content/uploads//media/images/ext/891825630/pad-thai.jpg',
          altText: 'Slide 2',
          caption: 'Slide 2',
          restaurantname: 'Special Thai'
        },
        {
          src: 'https://media.pixcove.com/C/6/3/Prawn-Drink-Food-Food-Pasta-Restaurant-Free-Image--1080.jpg',
          altText: 'Slide 3',
          caption: 'Da Mimmo Italian Restaurant Dublin was opened in 2010 by Tino Fuscardi. Our dishes have been developed over past generations to deliver the most authentic Italian food in Dublin. Da Mimmo is a family run Italian restaurant located in Dublin 3. We are well known in Dublin for our homemade wood fired Pizzas, Pasta & Anti Pasti; delicious desserts and a wide range of best Italian Wines. LovinDublin described Da Mimmo as an "Italian Gem" and we were listed in the top 10 Italian restaurants in Dublin.',
          restaurantname: 'Da Mimmo Italian'
        },
      ],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-100" src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });
    

    return (
      <section id="Restaurant" className="white">
        <div className="container">
          <Row>
            <Col xs="12" xl="12">
              <Card>
               
                <CardBody  > 
                  <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} ride="carousel">
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                  </Carousel>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
};

export default Restaurant;
