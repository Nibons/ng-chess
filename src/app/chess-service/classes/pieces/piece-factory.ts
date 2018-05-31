import { EPieceType } from "@chess/e-piece-type.enum";
import { IPlayer } from "@chess/iplayer.model";
import { IPosition } from "@chess/iposition";
import { Board } from "@chess/board";
import { IPiece } from "@chess/ipiece";
import { Bishop } from "@chess/pieces/bishop";
import { King } from "@chess/pieces/king";
import { Knight } from "@chess/pieces/knight";
import { Pawn } from "@chess/pieces/pawn";
import { Queen } from "@chess/pieces/queen";
import { Rook } from "@chess/pieces/rook";

export class PieceFactory {
    static Create(PieceType: EPieceType, position: IPosition, playerNumber: number, board: Board): IPiece {
        if (position.IsOccupied) { position.piece.Kill(); }
        switch (PieceType) {
            case EPieceType.bishop: { return new Bishop(position, playerNumber, board); }
            case EPieceType.king: { return new King(position, playerNumber, board); }
            case EPieceType.knight: { return new Knight(position, playerNumber, board); }
            case EPieceType.pawn: { return new Pawn(position, playerNumber, board); }
            case EPieceType.queen: { return new Queen(position, playerNumber, board); }
            case EPieceType.rook: { return new Rook(position, playerNumber, board); }
        }
    }
}