import { render, Component } from 'inferno'
import { LemmyHttp, GetSiteResponse } from 'lemmy-js-client';

const httpUrl = `http://${window.location.hostname}:8536/api/v1`;

const container = document.getElementById('app')

interface MyProps {}

interface MyState {
  site: GetSiteResponse,
}

class MyComponent extends Component<MyProps, MyState> {
  client: LemmyHttp;
  constructor(props: any, context: any) {
    super(props, context);
    this.client = new LemmyHttp(httpUrl);
    this.state = {
      site: null,
    };
  }

  async componentDidMount() {
    this.setState({site: await this.client.getSite({})});
  }

  public render() {
    return (
      <div>
        {this.state.site && (
          <>
            <h1>{`Hey there from Lemmy: ${this.state.site.site.name}`}</h1>
            <h2>Site data:</h2>
            <pre>{JSON.stringify(this.state.site, null, 2)}</pre>
          </>
        )}
      </div>
    );
  }
}

render(<MyComponent />, container)
