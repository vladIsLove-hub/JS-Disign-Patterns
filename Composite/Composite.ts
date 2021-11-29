abstract class Project {
  protected parent: Project;

  public setParent(proj: Project) {
    this.parent = proj;
  }

  public getParent(): Project {
    return this.parent;
  }

  public isComposite(): boolean {
    return false;
  }

  public add(proj: Project): void {}

  public remove(proj: Project): void {}

  public operation(): string | number{
    return;
  }
}

class RdlProjectComposite extends Project {
  protected children: Project[] = [];

  public add(proj: Project) {
    this.children.push(proj);
  }

  public remove(proj: Project): void {
    const componentIndex = this.children.indexOf(proj);
    this.children.splice(componentIndex, 1);

    proj.setParent(null);
  }

  public isComposite(): boolean {
    return true
  }

  public operation(): number{
    let totalDeps = 0;
    for (const child of this.children) {
      totalDeps += <number>child.operation();
    }
    return totalDeps;
  }
}

class SomeProjectLeaf1 extends Project {
  private static deps = ['build:rdl', 'run:react', 'clear:cache', 'run:tests']
  public operation() {
    return SomeProjectLeaf1.deps.length
  }
}

class SomeProjectLeaf2 extends Project {
  private static deps = ['build:some', 'run:vue', 'clear:tech']
  public operation() {
    return SomeProjectLeaf2.deps.length
  }
}

const clientCode = (project: Project) => {
  console.log(`Total deps: ${project.operation()}`);
}

const rdlProj = new RdlProjectComposite();
const leaf1 = new SomeProjectLeaf1();
const leaf2 = new SomeProjectLeaf2();
rdlProj.add(leaf1)
rdlProj.add(leaf2)

clientCode(rdlProj);