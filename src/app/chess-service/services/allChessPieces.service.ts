import { Bishop, Rook } from 'src/app/chess-service/classes/pieces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllChessPiecesService {
  constructor(bishop: Bishop, rook: Rook) { }
}
