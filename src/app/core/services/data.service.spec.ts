import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Category, Product } from "../../shared/interface";
import { apiKey } from "../../../enviroments/environment";

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        DataService ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all categories', () => {
    const mockedCategories: Category[] = [{id: 2, name: 'rolls', image: 'images/rolls.png'}];
    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockedCategories);
      const req = httpMock.expectOne(`${apiKey}/categories`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockedCategories)
    });
  });

  it('should retrieve products by category', () => {
    const mockedProducts: Product[] = [{
      id: 2,
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      categoryName: 'rolls',
      image: 'images/rolls.png'
    }];
    const categoryName = 'rolls';
    service.getCategoryByName(categoryName).subscribe(products => {
      expect(products).toEqual(mockedProducts);
      const req = httpMock.expectOne(`${apiKey}/categories`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockedProducts)
    })
  });

  it('should add a new product', () => {
    const mockedProduct: Product = {
      id: 2,
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      categoryName: 'rolls',
      image: 'images/rolls.png'
    };

    const formData = new FormData();
    formData.append('id', '7');
    formData.append('name', 'cola');
    formData.append('weight', '300');
    formData.append('price', '300');
    formData.append('ingredients', 'water');
    formData.append('categoryName', 'drinks');
    formData.append('image', 'images/ic.svg');
    service.addProducts(formData).subscribe(product => {
      expect(product).toEqual(mockedProduct);
    });

    const req = httpMock.expectOne(`${apiKey}/products`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockedProduct);
  });

  it('should update the products', () => {
    const formData = new FormData();
    formData.append('name', 'Dragon roll');
    const mockedProduct: Product = {
      id: 2,
      name: 'Dragon roll',
      weight: '300',
      price: 100,
      ingredients: 'water',
      categoryName: 'rolls',
      image: 'images/rolls.png'
    };

    service.updateProduct(formData, 2).subscribe(product => {
      expect(product).toEqual(mockedProduct);
      const req = httpMock.expectOne(`${apiKey}/products/2`);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockedProduct)
    })
  });

  it('should retrieve all products', () => {
    const mockedProducts: Product[] = [{
      id: 2,
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      categoryName: 'rolls',
      image: 'images/rolls.png'
    }];
    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockedProducts);
      const req = httpMock.expectOne(`${apiKey}/products`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockedProducts)
    });
  });

  it('should add a new category', () => {
    const mockedCategory: Category = {
      id: 1,
      name: 'pasta',
      image: 'images/rolls.png'
    };
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('name', 'pasta');
    formData.append('image', 'images/rolls.png');
    service.addCategory(formData).subscribe(category => {
      expect(category).toEqual(mockedCategory);
    });
    const req = httpMock.expectOne(`${apiKey}/categories`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockedCategory);
  });

  it('should update the categories', () => {
    const formData = new FormData();
    formData.append('name', 'salad');
    const mockedCategory: Category = {id: 2, name: 'salad', image: 'images/rolls.png'};

    service.updateCategory(formData, 2).subscribe(product => {
      expect(product).toEqual(mockedCategory);
      const req = httpMock.expectOne(`${apiKey}/products/2`);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockedCategory)
    })
  });

});
