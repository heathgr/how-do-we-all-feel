const scan = () => {
  Array.prototype.scan = function (projectionFunction) {
    let result = [];

    result.push(this[0]);

    this.forEach((arrayItem, id) => {
      if (id != 0) {
        result.push(projectionFunction(result[id - 1], arrayItem, id));
      }
    });
    return result;
  };
};

const zipLeftRight = () => {
  Array.prototype.zipLeftRight = function () {
    let result = [];

    for (let i = 0; i < this.length - 1; i++) {
      result.push([
        this[i],
        this[i + 1],
      ]);
    }

    return result;
  };
};

scan();
zipLeftRight();
