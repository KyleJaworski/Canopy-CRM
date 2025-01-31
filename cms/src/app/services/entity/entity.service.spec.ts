import { TestBed } from '@angular/core/testing';
import { EntityService } from './entity.service';

// Define a test entity type
interface TestEntity {
  id: number;
  name: string;
}

// Create a concrete test class that extends EntityService
class TestEntityService extends EntityService<TestEntity> {
  constructor() {
    super('testEntities', [{ id: 1, name: 'Test Entity' }]);
  }

  // Expose setEntities() for testing
  public updateEntities(entities: TestEntity[]): void {
    this.setEntities(entities);
  }

  // Expose setAddEntityState() for testing
  public updateAddEntityState(state: boolean): void {
    this.setAddEntityState(state);
  }

  // Expose getAddEntityState() for testing
  public fetchAddEntityState(): boolean {
    return this.getAddEntityState();
  }
}

describe('EntityService', () => {
  let service: TestEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestEntityService],
    });

    // Inject the concrete class, not the abstract one
    service = TestBed.inject(TestEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data', (done) => {
    service.entities$.subscribe((entities) => {
      expect(entities.length).toBe(1);
      expect(entities[0].name).toBe('Test Entity');
      done();
    });
  });

  it('should update entities correctly', (done) => {
    const newEntities = [{ id: 2, name: 'New Entity' }];
    service.updateEntities(newEntities);

    service.entities$.subscribe((entities) => {
      expect(entities.length).toBe(1);
      expect(entities[0].name).toBe('New Entity');
      done();
    });
  });

  it('should toggle addEntity state', () => {
    service.updateAddEntityState(true);
    expect(service.fetchAddEntityState()).toBeTrue();

    service.updateAddEntityState(false);
    expect(service.fetchAddEntityState()).toBeFalse();
  });
});
