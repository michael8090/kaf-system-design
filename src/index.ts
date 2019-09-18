interface Mesh {
  triangleIds: number[];
  children: Mesh[];
}
interface Point {
  x: number;
  y: number;
}

interface Box {
  // todo
}

type DisplayObject = Mesh;

interface IBehavior {
  owner: IEntity;
  readonly type: symbol;
}

abstract class Drawable implements IBehavior {
  owner: IEntity;
  readonly type = Symbol("Drawable");
  abstract draw(): DisplayObject;
}

abstract class Highlightable implements IBehavior {
  owner: IEntity;
  readonly type = Symbol("Highlightable");
  abstract getBBox(triangleId: Mesh["triangleIds"][0]): Box;
}

abstract class Pickable implements IBehavior {
  owner: IEntity;
  readonly type = Symbol("Pickable");
  abstract intersect(p: Point): Mesh["triangleIds"][0]; // triangle id
}

interface IEntity {
  behaviors: Map<IBehavior["type"], IBehavior>; // there is only one behavior of a type
  onBehaviorAdded(cb: (behavior: IBehavior) => void): void;
  onBehaviorRemoved(cb: (behavior: IBehavior) => void): void;
  children: IEntity[];
}

interface IDocument {
  getEntities(): IEntity[];
  onEntitiyAdded(cb: (entitiy: IEntity) => void): void;
  onEntitiyRemoved(cb: (entity: IEntity) => void): void;
}

interface InteractionState {
  hidden: Drawable[];
  highlighted: Highlightable[];
}

interface SceneManager {
  items: Drawable[];
  add(item: Drawable): void;
  remove(item: Drawable): void;
  draw(): DisplayObject;
}

interface Renderer {
  render(scene: DisplayObject): ImageData;
  onMouseEvent(cb: (e: MouseEvent) => void): void;
}

interface Tool {
  pick(
    pickables: Pickable[]
  ): {
    target: Pickable;
    triangleId: Mesh["triangleIds"][0];
  };
}
