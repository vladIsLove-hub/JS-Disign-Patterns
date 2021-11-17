class TargetUniqueData {
    public request(): {name: string, age: number}[] {
        return [
            {
                name: 'User',
                age: 22,
            }
        ]
    }
}

class Service {
    public ownRequest(): string {
        return JSON.stringify([
            {
                name: 'Admin',
                age: 111,
            }
        ])
    }
};

class ServiceAdapter extends TargetUniqueData {
    constructor (private service: Service) {
        super();
        this.service = service;
    }
    
    public request(): {name: string, age: number}[] {
        const result = JSON.parse(this.service.ownRequest());
        return result;
    }
}

const clientCode = (target: TargetUniqueData) => {
    console.log(target.request());
}
clientCode(new TargetUniqueData());

const service = new Service()
const serviceAdapter = new ServiceAdapter(service);

clientCode(serviceAdapter);

